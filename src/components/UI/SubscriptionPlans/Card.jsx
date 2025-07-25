import PremiumPlan from "./PremiumPlan";
import BasicPlan from "./BasicPlan";
import {BasicPlans, PremiumPlans} from "./data";


const Card = ()=> {
    return (
        <>
            <BasicPlan data={BasicPlans}/>
            <PremiumPlan data={PremiumPlans}/>
        </>
    );
}

export default Card;