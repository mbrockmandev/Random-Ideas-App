import IdeasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [
      // {
      //   id: 1,
      //   text: 'qpweofijqwf',
      //   tag: 'business',
      //   username: 'john',
      //   date: '02-01-2023',
      // },
      // {
      //   id: 2,
      //   text: 'qpweofijqwqwefqff',
      //   tag: 'technology',
      //   username: 'jill',
      //   date: '02-01-2023',
      // },
      // {
      //   id: 3,
      //   text: 'qpweofijqwf',
      //   tag: 'software',
      //   username: 'jane',
      //   date: '02-01-2023',
      // },
    ];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      console.log(this._ideas);
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // delete from server
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => {
        idea._id !== ideaId;
      });
      this.getIdeas();
    } catch (error) {
      alert('You cannot delete this resource!');
    }
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    }
    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        return `
      <div class="card" data-id="${idea._id}">
      ${deleteBtn}
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>
      `;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
