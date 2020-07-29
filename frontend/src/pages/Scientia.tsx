import React from 'react';

import Buttonbar from '../components/organisms/Buttonbar';
import Toastbar from '../components/organisms/Toastbar';
import Topbar from '../components/organisms/Topbar';

const Scientia: React.FC = () => {
  return (
    <>
      <Topbar />
			<Buttonbar/>
      <Toastbar />
    </>
  );
};

export default Scientia;