import '@fortawesome/fontawesome-free/css/all.css';
import IdeaForm from './components/IdeaForm';
import './css/style.css';
import Modal from './components/Modal';
import IdeaList from './components/IdeaList';

new Modal();
new IdeaList();
const ideaForm = new IdeaForm();
ideaForm.render();
