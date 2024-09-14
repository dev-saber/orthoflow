import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMedicalHistories } from '../data/medicalHistories/medicalsThunk';

function MedicalHistory() {
  const dispatch = useDispatch();
  const medicals = useSelector((state) => state.medicals.medicalHistories);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    !medicals.length && setIsLoading(true);
    dispatch(getMedicalHistories()).then(() => setIsLoading(false));
  }, []);

  return (
    <div>MedicalHistory</div>
  )
}

export default MedicalHistory