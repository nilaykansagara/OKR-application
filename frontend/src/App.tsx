import {useContext, useEffect, useState} from "react";
import {ObjectiveTypeWithId} from "./Types/OKRTypes.ts";
import {CreateOkrForm} from "./Components/CreateOkrForm.tsx";
import {ShowOKRs} from "./Components/ShowOKRs.tsx";
import {getOKRData} from "./OKR-store/OKR-Data.ts";
import {OKRContext} from "./provider/OKRProvider.tsx";
import {Routes, Route, Link} from "react-router";


function App() {

    const {objectives, setObjectives} = useContext(OKRContext);
    const [objectivesWithId, setObjectivesWithId] = useState<ObjectiveTypeWithId[]>([]);
    const isLoading = objectivesWithId === null;

    useEffect(() => {
        (async () => {
            const initialOKRData: ObjectiveTypeWithId[] = await getOKRData();
            console.log(initialOKRData);
            setObjectivesWithId(initialOKRData);
        })();
    }, [])

    return (

        <div>
            <div className="bg-gray-200 w-full justify-center flex space-x-16 p-2">
                <button className="bg-gray-500 hover:bg-gray-700 px-2 py-1 text-white"><Link to="/createOKR">Create OKR</Link></button>
                <button className="bg-gray-500 hover:bg-gray-700 px-2 py-1 text-white"><Link to="/showOKR">Show OKR</Link></button>
            </div>
            <Routes>
                <Route path="/" element={<div>Welcome</div>}/>
                <Route path="/createOKR" element={<CreateOkrForm
                    objectives={objectives ?? []}
                    setObjectives={setObjectives}
                    setObjectivesWithId={setObjectivesWithId}
                />}/>
                <Route path="/showOKR" element={isLoading ? (<p>Loading...</p>) : (<ShowOKRs
                    objectivesWithId={objectivesWithId}
                    setObjectivesWithId={setObjectivesWithId}
                />)}/>
            </Routes>

        </div>
    );
}

export default App;
