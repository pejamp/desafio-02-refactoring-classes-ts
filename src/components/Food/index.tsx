import { FiEdit3, FiTrash } from 'react-icons/fi';
import { useState } from 'react';

import { Container } from './styles';
import { api } from '../../services/api';

export type FoodProps = {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export interface FoodUpdate {
  food: FoodProps;
  handleEditFood(food: FoodProps): void;
  handleDelete(foodId: number): void;
}

export function Food(props: FoodUpdate) {
  const [isAvailable, setisAvailable] = useState(props.food.available);

  function setEditingFood() {
    props.handleEditFood(props.food);
  }

  async function toggleAvailable() {
    const { food } = props;

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setisAvailable(!isAvailable);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={props.food.image} alt={props.food.name} />
      </header>
      <section className="body">
        <h2>{props.food.name}</h2>
        <p>{props.food.description}</p>
        <p className="price">
          R$ <b>{props.food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${props.food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => props.handleDelete(props.food.id)}
            data-testid={`remove-food-${props.food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${props.food.id}`} className="switch">
            <input
              id={`available-switch-${props.food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${props.food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};


