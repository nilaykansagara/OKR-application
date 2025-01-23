import {useEffect, useState} from "react";
import {ObjectiveType, ObjectiveTypeWithId} from "./Types/OKRTypes.ts";
import {CreateOkrForm} from "./Components/CreateOkrForm.tsx";
import {ShowOKRs} from "./Components/ShowOKRs.tsx";
import {getOKRData} from "./OKR-store/OKR-Data.ts";


function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
  const [objectivesWithId, setObjectivesWithId] = useState<ObjectiveTypeWithId[] >([]);

  const isLoading = objectivesWithId===null;

  useEffect(() => {
    (async () => {

      const initialOKRData: ObjectiveTypeWithId[] = await getOKRData();
      console.log(initialOKRData);
      setObjectivesWithId(initialOKRData);

    })();
  }, [])

  return (
    <div>
      <CreateOkrForm
        objectives={objectives??[]}
        setObjectives={setObjectives}
        setObjectivesWithId={setObjectivesWithId}
      />
      {isLoading ? (<p>Loading...</p>) : (<ShowOKRs
          objectives={objectives}
          setObjectives={setObjectives}
        objectivesWithId={objectivesWithId}
        setObjectivesWithId={setObjectivesWithId}
      />)}

    </div>
  );
}

export default App;
