import React from 'react';
import "../styles/Version.css";

export interface VersionProps {

}

const Version: React.FunctionComponent<VersionProps> = () => {
    return (
        <div className="version">Version 1.4.3</div>
    );
}

export default Version;