import React, { useState } from "react";

export const modeContext = React.createContext();

export const Contxt = (props) => {
  const [mode, setMode] = useState(true);
  return (
    <div>
      <modeContext.Provider value={[mode, setMode]}>
        {props.children}
      </modeContext.Provider>
    </div>
  );
};
