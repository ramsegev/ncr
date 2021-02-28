import {render, screen, within} from '@testing-library/react';
import UsersTable from "./components/UsersTable";

test('test user table', () => {

  const values = [
      {"userName":"epaga","about":"Java developer","submittedArticles":197,"commentsCount":439,"signupDate":1301039509},
      {"userName":"patricktomas","about":"[ my public key: https://keybase.io/ptrcktms; my proof: https://keybase.io/ptrcktms/sigs/Z_woLEAc6ZrVtIAdZbAyp23r7vsL_clxNE3RE8DEmGQ ]","submittedArticles":6,"commentsCount":3,"signupDate":1255392958},{"userName":"saintamh","about":"","submittedArticles":4,"commentsCount":4,"signupDate":1267029423},{"userName":"panny","about":"","submittedArticles":51,"commentsCount":15,"signupDate":1510174513},
      {"userName":"olalonde","about":"olalonde@gmail.com","submittedArticles":1032,"commentsCount":3045,"signupDate":1261051630},{"userName":"WisNorCan","about":"bayesian optimist","submittedArticles":42,"commentsCount":107,"signupDate":1497196382},{"userName":"dmmalam","about":"Cofounder OctaveWealth (YCS12)","submittedArticles":645,"commentsCount":115,"signupDate":1312041112},{"userName":"replicatorblog","about":"https://twitter.com/josephflaherty<p>Formerly Wired:<p>https://www.wired.com/author/joseph-flaherty/<p>Now covering startups for Founder Collective, a fantastic VC firm:<p>http://www.foundercollective.com/","submittedArticles":550,"commentsCount":790,"signupDate":1224455310}
    ];
  render(<UsersTable rows={values} />);
  values.forEach((user) => {
    const row = screen.getByText(user.userName).closest("tr");
    const utils = within(row);
    expect(utils.getByText(user.userName)).toBeInTheDocument();
  });
});

