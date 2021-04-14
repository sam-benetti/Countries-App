import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Country } from './components/Country';
import { Region } from './components/Region';
import { Subregion } from './components/Subregion';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/country/:id' component={Country} />
                <Route exact path='/region/:id' component={Region} />
                <Route exact path='/subregion/:id' component={Subregion} />
            </Layout>
        );
    }
}
