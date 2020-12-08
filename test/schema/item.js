import { object, string, number} from 'yup';

export default object().shape({
  id: string(),
  name: string().required(),
  isFeatured: string(),
  type: string().required(),
  rating: number().required(),
  src: string().required(),
  class: string(),
  element: string()
})
