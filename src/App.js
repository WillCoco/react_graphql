import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloProvider,
} from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { link } from "./graphql/link";
import { schema as sch } from "./graphql/schema";
import { typeDefs } from './schema';
import { graphql } from "react-apollo";

const channelsListQuery = gql`
   query ChannelsListQuery {
     people {
       id
       name
     }
   }  
 `;

const weatherQuery = gql`
   query WeatherQuery {
     weather
   }  
 `;

const client = new ApolloClient({
  link: link || new HttpLink({ schema: typeDefs }),
  cache: new InMemoryCache(),
});

client.query({ query: channelsListQuery }).then((result) => console.dir( result));
client.query({ query: weatherQuery }).then((result) => console.dir( result));

const ChannelsList = ({ data: {loading, error, people }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>
    { people.map( p => <li key={p.id}>{p.name}</li> ) }
  </ul>;
};

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo GraphQL</h1>
          </header>
          <ChannelsListWithData />
        </div>
      </ ApolloProvider>
    );
  }
}

export default App;
