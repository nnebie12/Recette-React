import Layout from '../components/Layout/wrapper';  

import AddRecette from '../components/CrudRecette/AddRecette';
import { useRecettes } from '../hooks/useRecettes';



function EditPage() {

    const { addRecette } = useRecettes();
    
    return (
        <>
            <Layout>        
                <AddRecette addRecette={addRecette} />            
            </Layout>
            
        </>
    );

}
export default EditPage;