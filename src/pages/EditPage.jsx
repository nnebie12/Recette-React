import Layout from '../components/Layout/wrapper';  

import AddRecette from '../components/CrudRecette/AddRecette';
import { useRecettes } from '../hooks/useRecettes';
import BackButton from '../components/common/BackButton';



function EditPage() {

    const { addRecette } = useRecettes();
    
    return (
        <>
            <Layout>     
                <BackButton to="/">Retour</BackButton>
                <AddRecette addRecette={addRecette} />            
            </Layout>
            
        </>
    );

}
export default EditPage;