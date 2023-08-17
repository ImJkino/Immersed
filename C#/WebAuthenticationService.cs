public async Task LogInAsync(IUserAuthData user, params Claim[] extraClaims)
        {
            ClaimsIdentity identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme
                                , ClaimsIdentity.DefaultNameClaimType
                                , ClaimsIdentity.DefaultRoleClaimType);

            identity.AddClaim(new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider"
                                , _title
                                , ClaimValueTypes.String));

            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString(), ClaimValueTypes.String));

            identity.AddClaim(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name, ClaimValueTypes.String));
            
            
            if (user.Trainees != null && user.Trainees.Any())
            {
                foreach (int trainee in user.Trainees)
                {
                    identity.AddClaim(new Claim("Trainees", trainee.ToString(), ClaimValueTypes.String));
                }
            }          
            
            private static UserBase ExtractUser(ClaimsIdentity identity)
        {
            Sabio.Models.Domain.UserBase baseUser = new UserBase();
            List<string> roles = null;
            List<int> orgs = null;
            List<int> trainees = null;

            foreach (var claim in identity.Claims)
            
             case "CurrentTrainee":
                        baseUser.CurrentTraineeId = Int32.Parse(claim.Value);
                        break;

                    case "Trainees":
                        if (trainees == null)
                        {
                            trainees = new List<int>();
                        }
                        trainees.Add(Int32.Parse(claim.Value));
                        break;
                        
           baseUser.Trainees = trainees;

            return baseUser;
