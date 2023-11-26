import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Node,
    Background,
    BackgroundVariant,
    MiniMap,
    NodeTypes,

} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';




let id = 0;
const getId = () => `${id++}`;


const Flow = () => {
  


    const reactFlowWrapper = useRef(null);
  
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [name , setName] =useState({});
    const [nodeType , setNodeType] = useState();
     
       
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
        
    );

 
    const onNodeDrop = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    
   
    const onAdd = (
        (event) => {
      event.preventDefault();
        const newNode: Node = {
            id: getId(),
            data: { label: `${name} ` },
            type: nodeType,
            position: {
              x: 0,
              y: 0 + (nodes.length + 1) * 20
            },
         
          };
          setNodes((nds) => nds.concat(newNode));
        }
       
      );
      


   

    const onNodeDragStop = useCallback(
        (_, draggedNode) => {

            const nodesOverlap = (nodeA, nodeB) => (
                nodeA.position.x < nodeB.position.x + nodeB.width &&
                nodeA.position.x + draggedNode.width > nodeB.position.x &&
                nodeA.position.y < nodeB.position.y + nodeB.height &&
                nodeA.position.y + draggedNode.height > nodeB.position.y
            );
    
       
            const updatedNodes = nodes.map((node) => {
                if (node.id === draggedNode.id) {
                    return draggedNode;
                }
    
                if (nodesOverlap(draggedNode, node)) {
                
                    return {
                        ...node,
                        position: {
                            x: node.position.x - 50,
                            y: node.position.y - 50,
                        },
                    
                    };
                    
                }
    
                return node;
            });
    
            setNodes(updatedNodes);
        },
        [nodes]
    );
    


    return (
        <div className="flex h-full">
            <div className="flex-grow h-full">
                <div className="relative h-full">
                    <ReactFlowProvider>
                        <div className="h-full">
                            <ReactFlow
                                className="h-full bg-teal-50"
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                onInit={setReactFlowInstance}
                                onDragOver={onNodeDrop}
                                onNodeDragStop={onNodeDragStop}
                                fitView
                            
                            >


                                <Controls />
                                <MiniMap />
                            </ReactFlow>

                        </div>

                    </ReactFlowProvider>
                </div>

            </div>
          
            <Sidebar onAdd={onAdd} name={name} setName={setName} nodeType={nodeType} setNodeType={setNodeType} />
        </div>

    );
} 
export default Flow;