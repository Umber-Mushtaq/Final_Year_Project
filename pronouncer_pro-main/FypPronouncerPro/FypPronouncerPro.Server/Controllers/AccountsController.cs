using FypPronouncerPro.Server.DTO;
using FypPronouncerPro.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace FypPronouncerPro.Server.Controllers
{
    [ApiController]
    [Route("AccountsManagement")]
    public class AccountsController(PronouncerDbContext dbContext) : Controller
    {
        private readonly PronouncerDbContext dbContext = dbContext;

        [HttpGet]
        [Route("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await dbContext.Students.ToListAsync();

            if (users == null || !users.Any())
            {
                return NotFound("No users found");
            }

            return Ok(users);
        }


        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUP([FromBody] SignUPDTO student_dto)
        {
            if (student_dto == null) { return BadRequest("Empty Data"); }

            var emailExists = await dbContext.Students.Where(x => x.Email == student_dto.Email).FirstOrDefaultAsync();
            if (emailExists != null)
            {
                return BadRequest("Email already exists please use another email");
            }
            
            var nameExists = await dbContext.Students.Where(x => x.FullName == student_dto.FullName).FirstOrDefaultAsync();
            if (nameExists != null)
            {
                return BadRequest("Ussername already exists please use another username");
            }

            var student = new StudentsModel
            {
                FullName = student_dto.FullName,                                                                                    
                Email = student_dto.Email,
                Password = student_dto.Password,
                isActive = true,
            };

            dbContext.Students.Add(student);
            await dbContext.SaveChangesAsync();
            return Ok("Student Registered Successfully");
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInDTO student_dto)
        {
            if (student_dto == null) { return BadRequest("Empty Fields"); }

            var student = await dbContext.Students.Where(x => x.Email == student_dto.Email).FirstOrDefaultAsync();
            if (student == null)
            {
                return BadRequest("Please register yourself first!");
            }
            if (student.Password != student_dto.Password)
            {
                return BadRequest("Check your password");
            }
            return Ok("Welcome " + student.FullName);
        }

        [HttpPost]
        [Route("adminSignIn")]
        public async Task<IActionResult> AdminSignIn([FromBody] AdminSignInDTO admin_dto)
        {
            if (admin_dto == null) { return BadRequest("Empty Fields"); }

            var admin = await dbContext.Admin.Where(x => x.AdminEmail == admin_dto.AdminEmail).FirstOrDefaultAsync();
            if (admin == null)
            {
                return BadRequest("You are not Administrator!");
            }
            if (admin.AdminPassword != admin_dto.AdminPassword)
            {
                return BadRequest("Check your password");
            }
            return Ok("Welcome " + admin.AdminName);
        }

        [HttpPost]
        [Route("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] SignInDTO student_dto)
        {
            if (student_dto.Email == null) { return BadRequest("invalid data"); }

            // check if the user exists or not
            var user = await dbContext.Students.Where(x => x.Email == student_dto.Email).FirstOrDefaultAsync();
            if (user == null) 
            { 
                return BadRequest("user not found");
            }
            else
            {

                // send email
                string mail = "umber22j@gmail.com";
                string pw = "tchemyqybpoajrgv";

                var client = new SmtpClient("smtp.gmail.com", 587)
                {
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(mail, pw)
                };

                var message = new MailMessage(mail, student_dto.Email)
                {
                    Subject = "PronouncerPro Forgot Password",
                    Body = "Your new password is : " + student_dto.Password,
                    IsBodyHtml = true
                };

                await client.SendMailAsync(message);
                // Update the password
                user.Password = student_dto.Password;

                await dbContext.SaveChangesAsync();

                return Ok("Password has been changed Check From Your Email");
            }
        }

        [HttpPut]
        [Route("editprofile")]
        public async Task<IActionResult> EditProfile([FromBody] SignInDTO student_dto)
        {
            if (student_dto == null)
            {
                return BadRequest("Empty Data");
            }

            var student = await dbContext.Students.FirstOrDefaultAsync(x => x.Email == student_dto.Email);
            if (student == null)
            {
                return BadRequest("User not found");
            }

            student.Email = student_dto.Email;
            student.Password = student_dto.Password;

            await dbContext.SaveChangesAsync();

            return Ok("Profile updated successfully");
        }

        [HttpDelete]
        [Route("deleteaccount")]
        public async Task<IActionResult> DeleteAccount([FromBody] SignInDTO student_dto)
        {
            if (student_dto == null)
            {
                return BadRequest("Empty Data");
            }

            var student = await dbContext.Students.FirstOrDefaultAsync(x => x.Email == student_dto.Email);
            if (student == null)
            {
                return BadRequest("User not found");
            }

            dbContext.Students.Remove(student);
            await dbContext.SaveChangesAsync();

            return Ok("Account deleted successfully");
        }

    }
}
