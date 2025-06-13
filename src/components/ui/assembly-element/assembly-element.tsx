import React, { FC, memo } from 'react';
import styles from './assembly-element.module.css';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import { AssemblyIngredientUIProps } from './type';
import { MoveButton } from '@zlden/react-developer-burger-ui-components';

export const AssemblyIngredientUI: FC<AssemblyIngredientUIProps> =
  memo(
    ({
      ingredient,
      index,
      totalItems,
      handleMoveUp,
      handleMoveDown,
      handleClose
    }) => (
      <li className={`${styles.element} mb-4 mr-2`}>
        <MoveButton
          handleMoveDown={handleMoveDown}
          handleMoveUp={handleMoveUp}
          isUpDisabled={index === 0}
          isDownDisabled={index === totalItems - 1}
        />
        <div className={`${styles.element_fullwidth} ml-2`}>
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        </div>
      </li>
    )
  );
