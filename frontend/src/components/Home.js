import { Helmet } from "react-helmet";
import Notes from './Notes';

export const Home = (props) => {
  const {showAlert} = props
  
  return (
    <>
      <Helmet>
        <title>NoteIt - Your notes secured in the cloud</title>
      </Helmet>
      <div>
          <Notes showAlert={showAlert}/>
      </div>
    </>
  )
}

export default Home
