import React from 'react';
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="text-updater-node">

            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} />
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default TextUpdaterNode;
