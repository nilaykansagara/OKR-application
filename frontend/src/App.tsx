import {useContext, useEffect} from "react";
import {ObjectiveTypeWithId} from "./Types/OKRTypes.ts";
import {CreateOkrForm} from "./Components/CreateOkrForm.tsx";
import {ShowOKRs} from "./Components/ShowOKRs.tsx";
import {getOKRData} from "./OKR-store/OKR-Data.ts";
import {OKRContext} from "./provider/OKRProvider.tsx";
import {Link, Route, Routes} from "react-router";


function App() {

    const {objectives, setObjectives, objectivesWithId, setObjectivesWithId} = useContext(OKRContext);
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
            <div
                className="bg-gray-200 w-full justify-center bg-fixed flex space-x-16 p-2 fixed top-0 left-0 z-50">
                <button className="bg-gray-500 hover:bg-gray-700 px-2 py-1 text-white"><Link to="/createOKR">Create
                    OKR</Link></button>
                <button className="bg-gray-500 hover:bg-gray-700 px-2 py-1 text-white"><Link to="/showOKR">Show
                    OKR</Link></button>
            </div>
            <div className="items-center pt-12">
                <Routes>
                    <Route path="/" element={
                        <div className="flex py-60 justify-center items-center">
                            <div className="max-w-4xl text-center px-4">
                                <h1 className="text-3xl">Welcome! to <span
                                    className="font-bold text-teal-500">OKR-Application</span></h1>
                                <p className="mt-4">
                                    This is a simple project built for learning purposes. It’s focused on basic CRUD
                                    functionality and isn’t designed for a polished user experience. While the app
                                    works,
                                    it’s not intended to be a fully refined or feature-rich product. Thanks for checking
                                    it out—this app is all about learning and experimenting!
                                </p>
                            </div>
                        </div>
                    }/>
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

        </div>
    );
}

export default App;
