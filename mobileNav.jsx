import React,{Component} from "react";
import { Link } from "react-router-dom";
class MobileNav extends Component{
    render(){
        const {brands}=this.props;
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    Mobiles</Link>
                    <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
        {brands.map((n)=>
         <li className="nav-item">
            
         <Link className="nav-link" to={`/${n}`}>
             {n}         </Link>
                     </li>
     
        )}
                        </ul>
                    </div>
                    </nav>
        );
    }
}
export default MobileNav;