/*
  --- Type ---
  nullValue: null
  booleanValue: boolean
  integerValue: string, doubleValue: number
  timestampValue: string
  stringValue: string
  bytesValue: string
  referenceValue: string
  geoPointValue { object(LatLng) }
  arrayValue: {
    object(ArrayValue)
  }
  mapValue: {
    object(MapValue)
  }
*/

class FireStoreModel {
  constructor(collectionRef, documentType, firebase) {
    this.collectionRef = collectionRef;
    this.documentType = documentType;
    this.firebase = firebase;
    this.checkType = type => {
      switch (type) {
        case "null":
          return "null";
        case "boolean":
          return "boolean";
        case "number":
          return "number";
        case "timestamp":
          return "object";
        case "string":
          return "string";
        case "bytes":
          return "string";
        case "reference":
          return "object";
        case "geoPoint":
          return "object";
        case "array":
          return "object";
        case "map":
          return "object";
        default:
          return "undefined";
      }
    };
  }

  checkDocTypeData(data, isUpdate) {
    return new Promise(resolve => {
      const checkDocTypeData = {};
      const documentLength = Object.keys(this.documentType).length;
      let nullLength = 0;

      try {
        Object.keys(this.documentType).forEach(typeName => {
          const docType = this.checkType(this.documentType[typeName]);
          const isType = typeof data[typeName] === docType;

          // Type match
          if (isType) {
            checkDocTypeData[typeName] = data[typeName];
          }
          // No data
          if (typeof data[typeName] === "undefined") {
            if (!isUpdate && typeName !== "createdAt" && typeName !== "updatedAt") {
              checkDocTypeData[typeName] = null;
              nullLength += 1;

              console.warn(`The "${typeName}" type is undefined.`);
            }
            // Type mismatch
          } else if (!isType) {
            // Check data
            if (data[typeName]) {
              checkDocTypeData[typeName] = data[typeName];
            } else if (!isUpdate) {
              checkDocTypeData[typeName] = null;
              nullLength += 1;
            }

            console.warn(`The "${typeName}" type is not matched.`);
          }
        });

        if (documentLength === nullLength) {
          resolve(false);
        } else {
          resolve(checkDocTypeData);
        }
      } catch (e) {
        resolve(false);
        console.error(e);
      }
    }).then(checkDocTypeData => checkDocTypeData);
  }

  create(docId, data) {
    return new Promise(async resolve => {
      const result = await this.checkDocTypeData(data);
      if (this.createdAt) {
        result.createdAt = this.firebase.firestore.FieldValue.serverTimestamp();
      }
      if (result) {
        this.collectionRef
          .doc(docId)
          .set(result)
          .then(() => {
            resolve(docId);
          })
          .catch(err => resolve(err));
      } else {
        resolve(false);
        console.error("Failed to create data");
      }
    }).then(createdData => createdData);
  }

  add(data) {
    return new Promise(async resolve => {
      const result = await this.checkDocTypeData(data);
      if (this.createdAt) {
        result.createdAt = this.firebase.firestore.FieldValue.serverTimestamp();
      }
      if (result) {
        this.collectionRef
          .add(result)
          .then(docRef => {
            resolve(docRef.id);
          })
          .catch(err => resolve(err));
      } else {
        resolve(false);
        console.error("Failed to add data");
      }
    }).then(addedData => addedData);
  }

  update(docId, data) {
    return new Promise(async resolve => {
      const result = await this.checkDocTypeData(data, true);
      if (this.updatedAt) {
        result.updatedAt = this.firebase.firestore.FieldValue.serverTimestamp();
      }
      if (result) {
        this.collectionRef
          .doc(docId)
          .update(result)
          .then(() => {
            resolve(docId);
          })
          .catch(err => resolve(err));
      } else {
        resolve(false);
        console.error("Failed to update data");
      }
    });
  }

  delete(docId) {
    return new Promise(resolve => {
      this.collectionRef
        .doc(docId)
        .delete()
        .then(() => {
          resolve(docId);
        })
        .catch(err => {
          resolve(false);
          console.err("Failed to delete data", err);
        });
    }).then(data => data);
  }

  get(docId) {
    return new Promise(resolve => {
      this.collectionRef
        .doc(docId)
        .get()
        .then(async doc => {
          const data = doc.data();
          if (data) {
            const result = await this.checkDocTypeData(data);
            resolve(result);
          } else {
            resolve(false);
            console.error("Failed to get data");
          }
        });
    }).then(data => data);
  }

  getAll() {
    return new Promise(resolve => {
      this.collectionRef
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.forEach(doc => {
            data.push({ ...doc.data(), id: doc.id });
          });
          resolve(data);
        })
        .catch(err => {
          resolve(false);
          console.error("Failed to get all data", err);
        });
    }).then(data => data);
  }

  getFilter(query) {
    const filters = Object.keys(query).map(field => [
      field,
      "==",
      query[field] === "null" ? null : query[field]
    ]);

    let filterRef = this.collectionRef;
    filters.forEach(filter => {
      filterRef = filterRef.where(...filter);
    });
    return new Promise(resolve => {
      filterRef
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.forEach(doc => {
            data.push({ ...doc.data(), id: doc.id });
          });
          resolve(data);
        })
        .catch(err => {
          resolve(false);
          console.error("Failed to get filter data", err);
        });
    }).then(data => data);
  }

  getSearch(query) {
    const filters = Object.keys(query).map(field => [
      field,
      ">=",
      query[field]
    ]);

    let filterRef = this.collectionRef;
    filters.forEach(filter => {
      filterRef = filterRef.where(...filter);
    });
    return new Promise(resolve => {
      filterRef
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.forEach(doc => {
            data.push({ ...doc.data(), id: doc.id });
          });
          resolve(data);
        })
        .catch(err => {
          resolve(false);
          console.error("Failed to get filter data", err);
        });
    }).then(data => data);
  }

  async getPage({ field, offset, limit }) {
    let next;
    if (offset && Number(offset) > 0) {
      const startAt = this.collectionRef.orderBy(field).limit(Number(offset));
      const paginate = await startAt.get();
      const last = paginate.docs[paginate.docs.length - 1];
      next = this.collectionRef
        .orderBy(field)
        .startAfter(last.data()[field])
        .limit(Number(limit));
    } else {
      next = this.collectionRef.orderBy(field).limit(Number(limit));
    }

    return new Promise(resolve => {
      next
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.forEach(doc => {
            data.push({ ...doc.data(), id: doc.id });
          });
          resolve(data);
        })
        .catch(err => {
          resolve(false);
          console.error("Failed to get page data", err);
        });
    });
  }
}

class FireStoreDeepModel extends FireStoreModel {
  constructor(collectionRef, deepRef, deepCollectionRef, documentType) {
    super(collectionRef, documentType);

    this.collectionRef = this.collectionRef
      .doc(deepRef)
      .collection(deepCollectionRef);
  }
}

class FireStoreTimestampModel extends FireStoreModel {
  constructor(collectionRef, documentType) {
    super(collectionRef, documentType);

    this.createdAt = true;
    this.updatedAt = true;
  }
}

class FireStoreTimestampDeepModel extends FireStoreTimestampModel {
  constructor(collectionRef, deepRef, deepCollectionRef, documentType) {
    super(collectionRef, documentType);

    this.collectionRef = this.collectionRef
      .doc(deepRef)
      .collection(deepCollectionRef);
  }
}

module.exports = {
  FireStoreModel,
  FireStoreDeepModel,
  FireStoreTimestampModel,
  FireStoreTimestampDeepModel
};
