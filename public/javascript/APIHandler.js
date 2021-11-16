class APIHandler {
  constructor() {
    this.miniomnsApp = axios.create({
      baseURL: `https://minions-api.herokuapp.com`,
    });
  }

  getFullList() {
    return this.miniomnsApp.get("/characters");
  }

  getOneRegister(id) {
    return this.miniomnsApp.get(`/characters/${id}`);
  }

  createOneRegister(data) {
    return this.miniomnsApp.post(`/characters`, data);
  }

  updateOneRegister(id, data) {
    return this.miniomnsApp.put(`/characters/${id}`, data);
  }

  deleteOneRegister(id) {
    return this.miniomnsApp.delete(`/characters/${id}`);
  }
}
