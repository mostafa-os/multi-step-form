let step = document.querySelector(".container > div"),
  numbers = document.querySelectorAll(".number"),
  nextButton = document.querySelector(".next"),
  backButton = document.querySelector(".back"),
  content = document.querySelector(".content"),
  newContent = document.querySelector(".content + div");

let mainObj = {
  step1: {
    title: "Personal info",
    paragraph: "Please provide your name, email address, and phone number.",
    content: [
      {
        value: "Name",
        required: "This field is required",
        type: "text",
        placeholder: "e.g. Stephen king",
      },
      {
        value: "Email Address",
        required: "This field is required",
        invalid: "Invalid email address",
        type: "email",
        placeholder: "e.g. stephenking@lorem.com",
      },
      {
        value: "Phone Number",
        required: "This field is required",
        invalid: "Invalid phone number",
        type: "tel",
        placeholder: "e.g. +1 234 567 890",
      },
    ],
    buttonText: "Next Step",
  },
  step2: {
    title: "Select your plan",
    paragraph: "You have the option of monthly or yearly billing.",
    content: {
      plans: [
        {
          level: "arcade",
          month_price: "$9/mo",
          year_price: "$90/yr",
          free: "2 months free",
        },
        {
          level: "advanced",
          month_price: "$12/mo",
          year_price: "$120/yr",
          free: "2 months free",
        },
        {
          level: "pro",
          month_price: "$15/mo",
          year_price: "$150/yr",
          free: "2 months free",
        },
      ],
      period: {
        month: "Monthly",
        label: {
          input_type: "checkbox",
          input_class: "toggle-checkbox",
          div_class: "toggle",
        },
        year: "Yearly",
      },
    },
  },
  step3: {
    title: "Pick add-ons",
    paragraph: "Add-ons help enhance your gaming experience.",
    content: [
      {
        input_type: "checkbox",
        h4: "Online service",
        p: "Access to multiplayer games",
        month_salary: "+$1/mo",
        year_salary: "+$10/yr",
      },
      {
        input_type: "checkbox",
        h4: "Larger storage",
        p: "Extra 1TB of cloud save",
        month_salary: "+$2/mo",
        year_salary: "+$20/yr",
      },
      {
        input_type: "checkbox",
        h4: "Customizable Profile",
        p: "Custom theme on your profile",
        month_salary: "+$2/mo",
        year_salary: "+$20/yr",
      },
    ],
  },
  step4: {
    title: "Finishing up",
    paragraph: "Double-check everything looks OK before confirming.",
    content: {
      divs_classes: {
        main: "first",
        arr: ["second", "third", "fourth"],
      },
      change_span: "change",
      salary_span: "salary",
      total_month: "Total (per Month)",
      total_year: "Total (per Year)",
    },
    buttonText: "Next Step",
  },
  thank: {
    class: "thank",
    title: "Thank you!",
    paragraph: `Thanks for confirming your subscription! We hope you have fun using
        our platform. If you ever need support, please feel free to email us
        at support@loremgaming.com.`,
  },
};

let currentStep = 1,
  registerInputs = [],
  inputsArr = ["", "", ""],
  validationArr = [, ,],
  toggleChecked,
  choosenPlanIndex = 0,
  step3Checked = [, ,],
  radioInputs,
  checkboxInput,
  servicesInputs,
  salarySpans;

window.onload = step1(currentStep);

function step1(currentStep) {
  step.className = `step-${currentStep}`;
  document.querySelector("h2").innerHTML = mainObj.step1.title;
  document.querySelector("p").innerHTML = mainObj.step1.paragraph;
  content.innerHTML = "";
  newContent.innerHTML = "";
  nextButton.parentElement.style.justifyContent = "flex-end";
  nextButton.textContent = mainObj.step1.buttonText;
  nextButton.className = "next";

  let container = mainObj.step1.content;
  for (let i = 0; i < container.length; i++) {
    let label = document.createElement("label");
    label.innerHTML = `<div>
    <span>${container[i].value}</span>
    <span></span>
    </div>`;

    let input = document.createElement("input");
    input.type = container[i].type;
    input.placeholder = container[i].placeholder;
    input.value = inputsArr[i];
    label.appendChild(input);
    content.appendChild(label);
  }
  registerInputs = document.querySelectorAll(".step-1 input");
  registerInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      checkValidation(registerInputs);
      if (input.className === "required" || input.className === "invalid") {
        validationArr[index] = false;
        input.previousElementSibling.children[1].textContent =
          mainObj.step1.content[index][`${input.className}`];
        input.previousElementSibling.children[1].style.display = "inline";
        input.previousElementSibling.children[1].className = "error";
      } else {
        input.previousElementSibling.children[1].style.display = "none";
        inputsArr[index] = input.value;
        validationArr[index] = true;
      }
    });
  });
}

function step2(currentStep) {
  step.className = `step-${currentStep}`;
  document.querySelector("h2").innerHTML = mainObj.step2.title;
  document.querySelector("p").innerHTML = mainObj.step2.paragraph;
  content.innerHTML = "";
  newContent.innerHTML = "";
  nextButton.parentElement.style.justifyContent = "space-between";
  nextButton.textContent = mainObj.step1.buttonText;
  nextButton.className = "next";

  let plans = document.createElement("div");
  plans.classList.add("plans");
  content.appendChild(plans);

  let container = mainObj.step2.content;
  for (let i = 0; i < container.plans.length; i++) {
    let label = document.createElement("label");
    label.classList.add(`${container.plans[i].level}`);

    let input = document.createElement("input");
    input.type = "radio";
    input.name = "question";
    if (choosenPlanIndex === i) input.checked = true;
    label.appendChild(input);

    let img = document.createElement("div");
    img.classList.add("img");
    label.appendChild(img);

    let spans = document.createElement("div");
    spans.innerHTML = `<span class = plan-name>${container.plans[i].level}</span>
    <span>${container.plans[i].month_price}</span>
    <span class = free>${container.plans[i].free}</span>`;

    label.appendChild(spans);
    plans.appendChild(label);
  }

  //choose one plan
  radioInputs = document.querySelectorAll('input[type = "radio"]');

  let period = document.createElement("div");
  period.classList.add("period");

  period.innerHTML = `<span>${container.period.month}</span>
  <label>
  <input type = ${container.period.label.input_type} class = ${container.period.label.input_class}>
  <div class = ${container.period.label.div_class}></div>
  </label>
  <span>${container.period.year}</span>`;

  content.append(period);
  checkboxInput = document.querySelector(".toggle-checkbox");
  checkboxInput.checked = toggleChecked;

  document.querySelectorAll(".free").forEach((span, index) => {
    if (checkboxInput.checked) {
      span.style.display = "inline";
      span.previousElementSibling.textContent =
        container.plans[index].year_price;
    } else {
      span.style.display = "none";
      span.previousElementSibling.textContent =
        container.plans[index].month_price;
    }
  });

  checkboxInput.addEventListener("change", () => {
    document.querySelectorAll(".free").forEach((span, index) => {
      if (checkboxInput.checked) {
        span.style.display = "inline";
        span.previousElementSibling.textContent =
          container.plans[index].year_price;
      } else {
        span.style.display = "none";
        span.previousElementSibling.textContent =
          container.plans[index].month_price;
      }
    });
    toggleChecked = checkboxInput.checked;
  });
}

//step three function
function step3(currentStep) {
  step.className = `step-${currentStep}`;
  document.querySelector("h2").innerHTML = mainObj.step3.title;
  document.querySelector("p").innerHTML = mainObj.step3.paragraph;
  content.innerHTML = "";
  newContent.innerHTML = "";
  nextButton.parentElement.style.justifyContent = "space-between";
  nextButton.textContent = mainObj.step1.buttonText;
  nextButton.className = "next";

  let container = mainObj.step3.content;
  for (i = 0; i < container.length; i++) {
    let label = document.createElement("label");
    label.innerHTML = `<input type = ${container[i].input_type}>
    <span></span>
    <div>
    <h4>${container[i].h4}</h4>
    <p>${container[i].p}</p>
    </div>`;
    let span = document.createElement("span");
    if (checkboxInput.checked) span.textContent = container[i].year_salary;
    else span.textContent = container[i].month_salary;
    label.appendChild(span);
    content.appendChild(label);
  }

  servicesInputs = document.querySelectorAll("input");

  servicesInputs.forEach((input, index) => {
    input.checked = step3Checked[index];
  });
}
//step four function
function step4(currentStep) {
  step.className = `step-${currentStep}`;
  document.querySelector("h2").innerHTML = mainObj.step4.title;
  document.querySelector("p").innerHTML = mainObj.step4.paragraph;

  content.innerHTML = "";
  newContent.innerHTML = "";
  nextButton.parentElement.style.justifyContent = "space-between";
  nextButton.textContent = "Confirm";
  nextButton.className = "confirm";

  let container = mainObj.step4.content;

  let top = document.createElement("div");
  top.className = "top";

  let main = document.createElement("div");
  main.className = container.divs_classes.main;
  main.innerHTML = `
      <div>
      <h4>${getChoosenPlan(choosenPlanIndex)}</h4>
    </div>`;

  let changeSpan = document.createElement("span");
  changeSpan.className = container.change_span;
  changeSpan.textContent = container.change_span;
  main.children[0].appendChild(changeSpan);

  changeSpan.addEventListener("click", function () {
    goBack();
    goBack();
  });

  let mainSalary = document.createElement("span");
  mainSalary.className = container.salary_span;
  mainSalary.textContent =
    radioInputs[
      choosenPlanIndex
    ].nextElementSibling.nextElementSibling.children[1].textContent;
  main.appendChild(mainSalary);

  top.appendChild(main);

  step3Checked.forEach((el, index) => {
    if (el) {
      let div = document.createElement("div");
      div.className = container.divs_classes.arr[index];
      let s1 = document.createElement("span");
      s1.textContent =
        servicesInputs[
          index
        ].nextElementSibling.nextElementSibling.children[0].textContent;
      div.appendChild(s1);
      let s2 = document.createElement("span");
      s2.className = container.salary_span;
      s2.textContent =
        servicesInputs[index].parentElement.lastChild.textContent;
      div.appendChild(s2);

      top.appendChild(div);
    }
  });

  let down = document.createElement("div");
  down.className = "down";

  let s1 = document.createElement("span");
  if (checkboxInput.checked) s1.textContent = container.total_year;
  else s1.textContent = container.total_month;
  down.appendChild(s1);

  let s2 = document.createElement("span");
  s2.className = "total";
  down.appendChild(s2);

  newContent.appendChild(top);
  newContent.appendChild(down);
  step.insertBefore(newContent, nextButton.parentElement);

  salarySpans = document.querySelectorAll(".salary");
  s2.textContent = getTotalSalary(salarySpans);
}

//thank step
function thankYou() {
  step.innerHTML = "";
  step.style.justifyContent = "center";

  let thank = document.createElement("div");
  thank.className = mainObj.thank.class;

  let img = document.createElement("img");
  img.src = "./assets/images/icon-thank-you.svg";
  thank.appendChild(img);

  let h2 = document.createElement("h2");
  h2.textContent = mainObj.thank.title;
  thank.appendChild(h2);

  let p = document.createElement("p");
  p.textContent = mainObj.thank.paragraph;
  thank.appendChild(p);

  step.appendChild(thank);
}

//next step button
nextButton.addEventListener("click", function (e) {
  if (currentStep !== 1) {
    radioInputs.forEach((input, index) => {
      if (input.checked) {
        choosenPlanIndex = index;
      }
    });
  }

  if (servicesInputs) {
    servicesInputs.forEach((input, index) => {
      step3Checked[index] = input.checked;
    });
  }

  checkValidation(registerInputs);

  //handle error message
  registerInputs.forEach((input, index) => {
    if (input.className === "required" || input.className === "invalid") {
      validationArr[index] = false;
      input.previousElementSibling.children[1].textContent =
        mainObj.step1.content[index][`${input.className}`];
      input.previousElementSibling.children[1].style.display = "inline";
      input.previousElementSibling.children[1].className = "error";
    } else {
      input.previousElementSibling.children[1].style.display = "none";
      inputsArr[index] = input.value;
      validationArr[index] = true;
    }
  });

  //last page
  if (e.target.className === "confirm") thankYou();

  //handle aside
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i + 1] && !validationArr.includes(false)) {
      if (numbers[i].classList.contains("active")) {
        numbers[i].classList.remove("active");
        numbers[i + 1].classList.add("active");
        backButton.style.display = "inline";
        currentStep++;
        if (currentStep === 2) step2(currentStep);
        if (currentStep === 3) step3(currentStep);
        if (currentStep === 4) step4(currentStep);
        break;
      }
    }
  }
});

//go back button
backButton.addEventListener("click", goBack);

function goBack() {
  radioInputs.forEach((input, index) => {
    if (input.checked) {
      choosenPlanIndex = index;
    }
  });

  if (servicesInputs) {
    servicesInputs.forEach((input, index) => {
      step3Checked[index] = input.checked;
    });
  }

  for (let i = numbers.length - 1; i >= 0; i--) {
    if (numbers[1].classList.contains("active")) {
      backButton.style.display = "none";
    }
    if (numbers[i - 1]) {
      if (numbers[i].classList.contains("active")) {
        numbers[i].classList.remove("active");
        numbers[i - 1].classList.add("active");
        break;
      }
    }
  }
  currentStep--;
  if (currentStep === 1) step1(currentStep);
  if (currentStep === 2) step2(currentStep);
  if (currentStep === 3) step3(currentStep);
  if (currentStep === 4) step4(currentStep);
}

function checkValidation(registerInputs) {
  registerInputs.forEach((input, index) => {
    input.className = "";
    if (input.value !== "") {
      if (index === 1) {
        let re = /\w+@gmail.com/gi;
        if (!re.test(input.value)) {
          input.className = "invalid";
        }
      } else if (index === 2) {
        let re = /\d{11}/;
        if (!re.test(input.value)) {
          input.className = "invalid";
        }
      }
    } else {
      input.className = "required";
    }
  });
}

function getChoosenPlan(index) {
  let plan =
    radioInputs[index].nextElementSibling.nextElementSibling.children[0]
      .textContent;
  if (checkboxInput.checked) plan += " (Yearly)";
  else plan += " (Monthly)";
  return plan;
}

function getTotalSalary(arr) {
  let re = /\d+/gi;
  let total = 0;

  arr.forEach((span) => {
    total += parseInt(span.textContent.match(re));
  });
  if (checkboxInput.checked) return `$${total}/yr`;
  else return `$${total}/mo`;
}
