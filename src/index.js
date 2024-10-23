const classContainer = document.getElementById("class-container");
const medicineClassInput = document.getElementById("brand");
const nextField = document.getElementById("medicine-name");
const filter = document.getElementById("filter");
const medicineName = document.getElementById("medicine-name");
const nameFilter = document.getElementById("mName");
const doseFilter = document.getElementById("dose-filter");
const dose = document.getElementById("dose");
const interval = document.getElementById("interval");
const intervalFilter = document.getElementById("interval-filter");
const dropdown = document.getElementById("dropdown");
const form = document.getElementById("form");
const number = document.getElementById("number");
const notes = document.getElementById("notes");
const table = document.getElementById("table");
const empty = document.getElementById("empty");
const prescribe = document.getElementById("prescribe");
const remark = document.getElementById("remark");

classContainer.style.display = "none";
notes.value = "nil";

const fetchNextAPI = async (id) => {
  try {
    const newArray = [];
    const response = await fetch(
      `https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id/${id}`
    );
    const result = await response.json();
    newArray.push(result);
    const newElements = result
      .map((i) => {
        return `<p class='name-child'>${i.medicine_name}</p>`;
      })
      .join("");
    nameFilter.innerHTML = newElements;

    const nameChild = document.querySelectorAll(".name-child");
    nameChild.forEach((i) => {
      i.addEventListener("click", () => {
        medicineName.value = i.innerHTML;
        nameFilter.style.display = "none";
      });
    });
  } catch (error) {
    console.log("Error fetching data from next API:", error);
  }
};

const fetcher = async () => {
  const array = [];
  let newElement;
  await fetch("https://cliniqueplushealthcare.com.ng/prescriptions/drug_class")
    .then((res) => res.json())
    .then((data) => {
      array.push(data);
      newElement = data
        .map((i) => {
          return `<div class="class-child data-id=${i.id}">${i.name} <span class='hidden'>${i.id}</span></div>`;
        })
        .join("");
    })
    .catch((err) => console.log(err));

  classContainer.innerHTML = newElement;

  const drugClassElements = document.querySelectorAll(".class-child");
  drugClassElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      const selectedText = e.target.innerText;
      medicineClassInput.value = selectedText;
      const spanElement = e.target.querySelector("span");
      const spanID = spanElement.innerText;
      // console.log(spanID);
      filter.style.display = "none";

      fetchNextAPI(spanID);
    });
  });
};

fetcher();

medicineClassInput.addEventListener("click", () => {
  classContainer.style.display = "flex";
  filter.style.display = "block";
});

classContainer.addEventListener("click", () => {
  classContainer.style.display = "none";
});

medicineName.addEventListener("click", () => {
  nameFilter.style.display = "flex";
});
fetch("https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine")
  .then((res) => res.json())
  .then((data) => {
    const elements = data
      .map((i) => {
        return `<p class='strength'>${i.strength}</p>`;
      })
      .join("");
    const elementTwo = data
      .map((i) => {
        return `<p class='interval-child'>${i.medicine_type}</p>`;
      })
      .join("");
    // console.log(data);
    intervalFilter.innerHTML = elementTwo;
    intervalFilter.style.display = "none";
    interval.addEventListener("click", () => {
      intervalFilter.style.display = "flex";
      intervalFilter.style.flexDirection = "column";
    });
    const intervalChild = document.querySelectorAll(".interval-child");

    intervalChild.forEach((i) => {
      i.addEventListener("click", () => {
        interval.value = i.innerText;
        intervalFilter.style.display = "none";
      });
    });
    doseFilter.innerHTML = elements;
    doseFilter.style.display = "none";
    const strength = document.querySelectorAll(".strength");
    dose.addEventListener("click", () => {
      doseFilter.style.display = "flex";
    });
    strength.forEach((i) => {
      i.addEventListener("click", () => {
        dose.value = i.innerText;
        doseFilter.style.display = "none";
      });
    });
  })
  .catch((err) => console.log(err));
const tableElements = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const className = medicineClassInput.value;
  const name = medicineName.value;
  const doseValue = dose.value;
  const intervalValue = interval.value;
  const numberValue = number.value;
  const dropdownValue = dropdown.value;
  const notesValue = notes.value;

  const tableELement = table.getElementsByTagName("tbody")[0];
  const newRow = tableELement.insertRow();
  const snCell = newRow.insertCell(0);
  const nameCell = newRow.insertCell(1);
  const classCell = newRow.insertCell(2);
  const doseCell = newRow.insertCell(3);
  const durationCell = newRow.insertCell(4);
  const instructionCell = newRow.insertCell(5);
  const actionCell = newRow.insertCell(6);

  snCell.textContent = "1";
  nameCell.textContent = className;
  classCell.textContent = name;
  doseCell.textContent = doseValue;
  durationCell.textContent = `${numberValue} / ${dropdownValue}`;
  instructionCell.textContent = notesValue;
  actionCell.innerHTML = "<p class='remove'>remove</p>";
  // actionCell.setAttribute("class", "remove");

  empty.style.display = "none";
});
let toggle = false;
prescribe.addEventListener("click", () => {
  remark.style.display = "flex";
  if (toggle) {
    toggle = false;
  } else {
    toggle = true;
  }
});
