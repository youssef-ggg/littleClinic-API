module.exports = function buildMakeDiagnosis(){

    return function makeDiagnosis({
        patientId,
        cheifComplaint,
        vitalSigns,
        pyhsicalExam,
        medications,
        treatment,
        orders,
        problems,
        createdOn = Date.now(),
        modifiedOn = Date.now(),
    }={})
    {

        if(patientId == null || patientId == ''){
            throw new Error('must have a patient\'s id.')
        }
        if(!cheifComplaint ||cheifComplaint == '')
            throw new Error('A diagnosis must have a Cheif Compliant.'); 
        if(!problems || problems.length == 0)
            throw new Error('must have a diagonised problem.');

        return Object.freeze({
           GetpatientId:()=>patientId,
           getCheifComplaint:()=>cheifComplaint,
           getVitalSigns:()=>MakeVitalSigns(vitalSigns),
           getPyhsicalExam:()=>makephysicalExam(pyhsicalExam),
           getMedications:()=>medications,
           getTreatment:()=>treatment,
           getOrders:()=>orders,
           getProblems:()=>problems,
           getCreatedOn:()=>createdOn,
           getModifiedOn:()=>modifiedOn,
        });

    }

    function MakeVitalSigns({
        height,
        weight,
        temperature,
        tempSite,
        pulseRate,
        respirationRate,
        bloodPressure
    }={}){

        return Object.freeze({
            getHeight:()=>height,
            getWeight:()=>weight,
            getTemperature:()=>temperature,
            getTempSite:()=>tempSite,
            getPulseRate:()=>pulseRate,
            getRespirationRate:()=>respirationRate,
            getBloodPressure:()=>bloodPressure
        });
    }

    function makephysicalExam({
        generalAppearance = 'well developed, well nourished, no acute distress',
        eyes = 'conjunctiva and lids normal, PERRLA, EOMI, fundi WNL',
        earsNoseMouthThroat = 'TM clear, nares clear, oral exam WNL',
        respiratory = 'respiratory effort normal',
        cardiovascular = 'regular rate and rhythm',
        skin = ' clear, good turgor, color WNL, no rashes, lesions, or ulcerations',
        impression = ''
    }={}){
        
        return Object.freeze({
            getGeneralAppearance:()=>generalAppearance,
            getEyes:()=>eyes,
            getEarsNoseMouthThroat:()=>earsNoseMouthThroat,
            getRespiratory:()=>respiratory,
            getCardiovascular:()=>cardiovascular,
            getSkin:()=>skin,
            getImpression:()=>impression
        });
    }
}

