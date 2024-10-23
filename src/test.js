fetch("https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
