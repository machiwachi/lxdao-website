const { gql } = require('graphql-request');

export const SNAPSHOTURL = 'https://hub.snapshot.org/graphql';

export const queryProposals = gql`
  query {
    proposals(
      first: 20
      skip: 0
      where: { space_in: ["lxdao.eth"] }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      scores
      scores_by_strategy
      scores_total
      scores_updated
      author
      space {
        id
        name
      }
    }
  }
`;
