import IdeasApi from '../services/ideasApi';
import IdeaList from './IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert('Please enter all fields');
      return;
    }

    // save username to local storage
    localStorage.setItem('username', this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data);

    // clear form fields
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.render();

    document.dispatchEvent(new Event('closeModal'));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input
        type="text"
        name="username"
        value="${
          localStorage.getItem('username')
            ? localStorage.getItem('username')
            : ''
        }"
        id="username" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea
        name="text"
        id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <select 
        name="tag"
        id="tag"
      >
    <option value="">Please select an option</option>
    <option value="technology">Technology</option>
    <option value="software">Software</option>
    <option value="business">Business</option>
    <option value="education">Education</option>
    <option value="health">Health</option>
    <option value="inventions">Inventions</option>

  </select>
    <button
      class="btn"
      type="submit"
      id="submit">
      Submit
    </button>
  </form>
    `;
    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;