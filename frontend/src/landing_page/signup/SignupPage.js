import React from 'react';
import Opening from './Opening';
import StepsnBenefits from './StepsnBenefits';
import Signup from './Signup';
import OpenAccount from '../OpenAccount';

function SignupPage() {
    return (
        <>
            <Signup />
            <Opening />
    
            <StepsnBenefits />
            <OpenAccount />
        </>
    );
}

export default SignupPage;