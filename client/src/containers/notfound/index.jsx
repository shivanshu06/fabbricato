import { Button } from 'antd'
import pagenot from '../../assets/images/404/404.svg'
import styles from './styles.module.css'
const Notfound=()=>{
    return(
        
            <div className={styles.notfound}>
                <img className={styles.image} src={pagenot} alt='404 not found'/>
                <p>We couldn't find what you were looking for. </p>
                <Button>Go to Homepage</Button>
            </div>
       

    )
}

export default Notfound