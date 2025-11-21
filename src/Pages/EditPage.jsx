import Layout from '../components/Layout/wrapper';  

import Addrecette from '../components/CrudRecette/Addrecette';
import { useRecettes } from '../hooks/useRecettes';



function EditPage() {

    const { addRecette } = useRecettes();
    
    return (
        <>
            <Layout>        
                <Addrecette addRecette={addRecette} />            
            </Layout>
            
        </>
    );

}
export default EditPage;