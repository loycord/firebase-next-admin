import { FaUsers, FaHdd, FaFolder } from 'react-icons/fa';
import { Navigation } from './types';

const data: Navigation[] = [
  {
    pathname: '/admin',
    name: 'Admin',
    app: [
      { name: 'Auth', icon: (props) => <FaUsers {...props} /> },
      { name: 'Database', icon: (props) => <FaHdd {...props} /> },
      { name: 'Storage', icon: (props) => <FaFolder {...props} /> }
    ]
  },
  {
    pathname: '/statistics',
    name: 'Statistics',
    app: [
      // { name: 'Auth', icon: (props) => <FaUsers {...props} /> },
      // { name: 'Database', icon: (props) => <FaHdd {...props} /> },
      // { name: 'Storage', icon: (props) => <FaFolder {...props} /> }
    ]
  },
  {
    pathname: '/overview',
    name: 'Overview',
    app: [
      // { name: 'Auth', icon: (props) => <FaUsers {...props} /> },
      // { name: 'Database', icon: (props) => <FaHdd {...props} /> },
      // { name: 'Storage', icon: (props) => <FaFolder {...props} /> }
    ]
  }
];

export default data;
