import React from 'react';

import Buttonbar from '../organisms/Buttonbar';
import Toastbar from '../organisms/Toastbar';
import Topbar from '../organisms/Topbar';

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