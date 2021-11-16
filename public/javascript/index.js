const charactersAPI = new APIHandler();

window.addEventListener("load", () => {
  document.getElementById("fetch-all").addEventListener("click", function (event) {
    charactersAPI
      .getFullList()
      .then((result) => {
        let mainDiv = document.querySelector(".characters-container");
        numchilds = mainDiv.children.length;

        result.data.forEach((character) => {
          let clone = document.querySelector(".character-info").cloneNode(true);
          clone.querySelector(".name").innerHTML = "Character Name : " + character.name;
          clone.querySelector(".occupation").innerHTML =
            "Character Occupation : " + character.occupation;
          clone.querySelector(".cartoon").innerHTML = "Is a Cartoon? : " + character.cartoon;
          clone.querySelector(".weapon").innerHTML = "Character Weapon : " + character.weapon;
          mainDiv.appendChild(clone);
        });

        for (let i = 0; i < numchilds; i++) {
          mainDiv = document.querySelector(".characters-container");
          mainDiv.removeChild(mainDiv.children[0]);
        }
      })
      .catch((err) => console.log(err));
  });

  document.getElementById("fetch-one").addEventListener("click", function (event) {
    const id = document.querySelector(".operation input").value;
    charactersAPI
      .getOneRegister(id)
      .then((character) => {
        let mainDiv = document.querySelector(".characters-container");
        let clone = document.querySelector(".character-info").cloneNode(true);
        mainDiv.innerHTML = "";
        clone.querySelector(".name").innerHTML = character.data.id;
        clone.querySelector(".occupation").innerHTML = character.data.occupation;
        clone.querySelector(".cartoon").innerHTML = character.data.cartoon;
        clone.querySelector(".weapon").innerHTML = character.data.weapon;
        mainDiv.appendChild(clone);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  document.getElementById("delete-one").addEventListener("click", function (event) {
    let id = document.querySelector(" input[name='character-id-delete']").value;
    charactersAPI.deleteOneRegister(id).then();
  });

  document.getElementById("edit-character-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.querySelector("#edit-character-form input[name='chr-id']").value;

    let info = {
      name: document.querySelector("#edit-character-form input[name='name']").value,
      occupation: document.querySelector("#edit-character-form input[name='occupation']").value,
      weapon: document.querySelector("#edit-character-form input[name='weapon']").value,
      cartoon: document.querySelector("#edit-character-form input[name='cartoon']").checked,
    };

    charactersAPI
      .updateOneRegister(id, info)
      .then((result) => {
        document.querySelector("#edit-character-form button").style.backgroundColor = "green";
      })
      .catch((err) => {
        document.querySelector("#new-character-form button").style.backgroundColor = "red";
        console.log(err);
      });
  });

  document.getElementById("new-character-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let info = {
      name: document.querySelector("form.character-form input[name='name']").value,
      occupation: document.querySelector("form.character-form input[name='occupation']").value,
      weapon: document.querySelector("form.character-form input[name='weapon']").value,
      cartoon: document.querySelector("form.character-form input[name='cartoon']").checked,
    };
    charactersAPI
      .createOneRegister(info)
      .then((created) => {
        document.querySelector("#new-character-form button").style.backgroundColor = "green";
      })
      .catch((err) => {
        document.querySelector("#new-character-form button").style.backgroundColor = "red";
        console.log(err);
      });
  });
});
