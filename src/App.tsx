import {useState} from "react";

function App() {

    const initialObjectives = [
        "Build a frontend team",
        "Build a backend team",
        "Build a testing team",
    ];

    const [objectives, setObjectives] = useState(initialObjectives);

    const [newObjective, setNewObjective] = useState<string>("");

    function addNewObjective() {
        setObjectives(prev => [...prev, newObjective]);
    }

    return (
        <>
            <div className="border px-4 py-8">
                <input className={"border px-3 py-1"} type="text" placeholder={"Enter objective"} value={newObjective}
                       onChange={(e) => setNewObjective(e.target.value)}/>
                <button className={"border-2 bg-blue-400 px-2 hover:bg-blue-700 text-white"} onClick={addNewObjective}>Add Objective</button>
                <div>
                    {
                        objectives.length > 0 ? objectives.map((objective) => (
                                <p>{objective}</p>
                            ))
                            : (<span>No objectives to display</span>)
                    }
                    {/*<span>Build a frontend</span>*/}
                    {/*<div className="ml-4">*/}
                    {/*  <p>Hire 5 frontend developers.</p>*/}
                    {/*  <p>Revise react concepts</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
}

export default App;
