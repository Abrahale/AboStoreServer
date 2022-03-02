export const handleResponse = (res, data)=>{
  res.status(200).send({success:true, result:data});
}
export const handleError = (res, err)=>{
  res.status(500).send({success:false, result:err});
}

export const requestTime =  (req, res, next) => {
  req.requestTime = Date.now()
  next()
}

