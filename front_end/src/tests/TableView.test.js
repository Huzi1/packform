import React from 'react';
import TableView from '../componenets/TableView';
import renderer from 'react-test-renderer';



it('renders correctly when there are no items', () => {
    const tree = renderer.create(<TableView />).toJSON();
    expect(tree).toMatchSnapshot();
});

