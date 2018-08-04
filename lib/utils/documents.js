/**
 * 
 * @param {String} value // Value to be copied
 */

export function copyClip(value) {
  const copyNode = document.createElement('textarea');
  copyNode.value = value;
  document.body.appendChild(copyNode);
  copyNode.focus();
  copyNode.select();

  document.execCommand('copy');
  document.body.removeChild(copyNode);
}
