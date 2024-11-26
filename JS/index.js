let siteName = document.getElementById("siteName");
let siteURL = document.getElementById("siteURL");
let submitBtn = document.getElementById("submitBtn");
let alertBox = document.getElementById("alertBox");
let siteList = [];

if (localStorage.getItem("sites")) {
  siteList = JSON.parse(localStorage.getItem("sites"));
  displaySite();
}

function addSite() {
  if (Validation(siteName) && Validation(siteURL)) {
    alertBox.classList.add("d-none");
    var site = {
      name: siteName.value,
      URL: /^(https?:\/\/)/.test(siteURL.value)
        ? siteURL.value
        : `https://${siteURL.value}`,
    };
    siteList.push(site);
    localStorage.setItem("sites", JSON.stringify(siteList));
    displaySite();
    clearForm();
  } else {
    alertBox.classList.replace("d-none", "d-block");
  }
}

function clearForm() {
  siteName.value = null;
  siteURL.value = null;
}

function displaySite() {
  let box = ``;
  for (let i = 0; i < siteList.length; i++) {
    box += `<tr class="py-5 text-center">
                <td>${i + 1}</td>
                <td>${siteList[i].name}</td>
                <td>
                  <button class="btn-visit px-1 py-2 rounded-2 text-white">
                    <a
                      href="${siteList[i].URL}"
                      class="text-center mx-2 d-flex justify-content-between align-items-center"
                      target="_blank"
                      ><i class="fa-solid fa-eye py-1 px-1"></i>
                      <span class="ms-1">visit</span>
                    </a>
                  </button>
                </td>
                <td>
                  <button class="btn-delete px-1 py-2 rounded-2 text-white">
                    <a
                      href=""
                      class="text-center mx-2 d-flex justify-content-between align-items-center"
                      onclick="deleteSite(${i})"
                      target="_blank"
                      ><i class="fa-solid fa-trash-can py-1 px-1"></i
                      ><span class="ms-1">Delete</span></a
                    >
                  </button>
                </td>
              </tr>
    `;
  }
  tableBody.innerHTML = box;
}

submitBtn.addEventListener("click", function (e) {
  addSite();
});

function deleteSite(deleteIndex) {
  siteList.splice(deleteIndex, 1);
  localStorage.setItem("sites", JSON.stringify(siteList));
  displaySite();
}

function Validation(site) {
  let regex = {
    siteName: /^\w{1,10}$/,
    siteURL: /^((https?\:\/\/)?(www\.)?)?.{1,}(\.[a-zA-Z0-9]{2,})(\/?.{2,})?$/,
  };
  if (regex[site.id].test(site.value)) {
    site.classList.add("is-valid");
    site.classList.remove("is-invalid");
    return true;
  } else {
    site.classList.remove("is-valid");
    site.classList.add("is-invalid");
    return false;
  }
}

document.addEventListener("input", function (e) {
  Validation(e.target);
});
