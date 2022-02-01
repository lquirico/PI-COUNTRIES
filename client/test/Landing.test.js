import React from 'react';
import LandingPage from "../src/components/Landingpage"
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import style from '../css/LandingPage.module.css'


configure({ adapter: new Adapter() });

describe('<LandingPage /> Mounted', () => {

    it("Renderiza sin Romperse", () => {
        shallow(<LandingPage />);
      });

      it("Renderiza el botón", () => {
        const render = shallow(<LandingPage />);
        const home = <button className={style.button}> Home </button>;
        expect(render.contains(home)).toEqual(true);
      });

      it("Renderiza  'WELCOME' ", () => {
        const wrapper = shallow(<LandingPage />);
        const welcome = <h1 className={style.title}> WELCOME </h1>;
        expect(wrapper.contains(welcome)).toEqual(true);
      });
})