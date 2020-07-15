import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { render } from "@testing-library/react"
import Landing from '../componenets/Landing';





it('landing button with go to order should be rendered', () => {

    const { getByText } = render(<Landing />)

    expect(document.querySelector("a").getAttribute("href")).toBe("/Orders")



});
