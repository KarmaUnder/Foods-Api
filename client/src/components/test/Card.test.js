import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from '../Card.jsx';

configure({adapter: new Adapter()});

describe('<Card />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Card />);
    })
    it('Renderiza 3 <div>', () => {
      expect(wrapper.find('div')).toHaveLength(3);
    })

    it('Renderiza una img', () => {
      expect(wrapper.find('img')).toHaveLength(1);
    })

    it('Renderiza un h4 con el titulo que llega por props', () => {
      expect(wrapper.find('h4')).toHaveLength(1);
    })
  })
});