import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBills } from '../data/bills/billsThunk'

function Bills() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBills())
  }, [])

  return (
    <div>Bills</div>
  )
}

export default Bills