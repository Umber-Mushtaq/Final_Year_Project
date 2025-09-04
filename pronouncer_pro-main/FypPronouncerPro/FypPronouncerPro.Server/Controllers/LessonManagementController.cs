using Azure.Core;
using FypPronouncerPro.Server.DTO;
using FypPronouncerPro.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FypPronouncerPro.Server.Controllers;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography.X509Certificates;

namespace FypPronouncerPro.Server.Controllers
{
    [ApiController]
    [Route("ParaLessonManagement")]
    public class LessonManagementController : Controller
    {
        private readonly PronouncerDbContext databaseContext;
        public LessonManagementController(PronouncerDbContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }


        [HttpPost]
        [Route("createLesson")]
        public async Task<IActionResult> CreateLesson([FromBody] LessonDTO lessonDTO)
        {
            if (lessonDTO == null)
            {
                return BadRequest("Invalid data");
            }
            try
            {
                var lessonExist = await databaseContext.Lessons.Where(x => x.LessonTitle == lessonDTO.LessonTitle).FirstOrDefaultAsync();
                if (lessonExist != null)
                {
                    return BadRequest("This title is used for other lesson use another title");
                }
                // Convert the DTO to your model
                var lesson = new LessonsModel
                {
                    LessonTitle = lessonDTO.LessonTitle,
                    LessonContent = lessonDTO.LessonContent,
                    LessonLevel = lessonDTO.LessonLevel,
                    FocusWords = lessonDTO.FocusWords
                };

                databaseContext.Lessons.Add(lesson);
                await databaseContext.SaveChangesAsync();
                return Ok("Lesson created successfully");
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost]
        [Route("saveJoinedLesson")]
        public async Task<IActionResult> SaveJoinedLesson([FromBody] UserLessonRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid Data");
            }

            var student = await databaseContext.Students.Where(x => x.Email == request.UserEmail).FirstOrDefaultAsync();
            var userName = student.FullName;

            var userLesson = new UserLessonsModel
            {
                UserName = userName,
                LessonTitle = request.LessonTitle,
                LessonContent = request.LessonContent,
                FocusWords = request.FocusWords,
                LessonLevel = request.LessonLevel,
                InProgress = false,
                IsComplited = false,
            };

            await databaseContext.UserLessons.AddAsync(userLesson);
            await databaseContext.SaveChangesAsync();
            return Ok("Joined Lesson Is Saved");

        }

   
        [HttpPost]
        [Route("saveMispronunciations")]

        public async Task<IActionResult> SaveMispronunciations([FromBody] MispronunciationsDTO request)
        {
            if (request == null)
            {
                return BadRequest("Invalid Data");
            }

            var student = await databaseContext.Students.Where(x => x.Email == request.Email).FirstOrDefaultAsync();
            var userName = student.FullName;

            var UserLesson = await databaseContext.UserLessons
                        .FirstOrDefaultAsync(x => x.UserName == userName && x.LessonTitle == request.LessonTitle);

            // if mwhat and mhow arrays are empty turn iscompleted to true

            if (request.M_What.Count == 0 && request.M_How.Count == 0)
            {
                if (UserLesson != null)
                {
                    UserLesson.IsComplited = true; // Update progress attribute to true
                    databaseContext.Update(UserLesson);
                    await databaseContext.SaveChangesAsync();
                }
            }

            // save mispronunciations

            var existingMispronunciation = await databaseContext.Mispronunciations
                .Where(x => x.UserName == userName && x.LessonTitle == request.LessonTitle)
                .FirstOrDefaultAsync();

            if (existingMispronunciation != null)
            {
                existingMispronunciation.M_What = request.M_What;
                existingMispronunciation.M_How = request.M_How;
                databaseContext.Entry(existingMispronunciation).State = EntityState.Modified;
            }
            else
            {
                var mispronunciation = new MispronunciationsModel
                {
                    UserName = userName,
                    LessonTitle = request.LessonTitle,
                    M_What = request.M_What,
                    M_How = request.M_How,
                };

                await databaseContext.AddAsync(mispronunciation);
            }

            await databaseContext.SaveChangesAsync();

            // turn inProgress to true

            if (UserLesson != null)
            {
                UserLesson.InProgress = true; // Update progress attribute to true
                databaseContext.Update(UserLesson);
                await databaseContext.SaveChangesAsync();
            }

            return Ok("Mispronunciations saved");
        }

        [HttpDelete]
        [Route("removeMispronunciation")]
        public async Task<IActionResult> RemoveMispronunciation(string email, string title, string word)
        {
            var student = await databaseContext.Students.FirstOrDefaultAsync(x => x.Email == email);
            var userName = student?.FullName;

            if (userName == null)
            {
                return BadRequest("Invalid student email");
            }

            var existingMispronunciation = await databaseContext.Mispronunciations
                .FirstOrDefaultAsync(x => x.UserName == userName && x.LessonTitle == title);

            if (existingMispronunciation == null)
            {
                return BadRequest("Mispronunciation not found");
            }

            // Find the index of the mispronunciation to remove
            int indexToRemove = existingMispronunciation.M_What.IndexOf(word);

            if (indexToRemove == -1)
            {
                return BadRequest("Mispronunciation not found in the list");
            }

            // Remove the mispronunciation from the M_What array and the corresponding index from the M_How array
            existingMispronunciation.M_What.RemoveAt(indexToRemove);
            existingMispronunciation.M_How.RemoveAt(indexToRemove);

            // Check if both M_What and M_How arrays are empty
            if (existingMispronunciation.M_What.Count == 0 && existingMispronunciation.M_How.Count == 0)
            {
                // Update the corresponding UserLessons record to set IsCompleted to true
                var userLesson = await databaseContext.UserLessons
                    .FirstOrDefaultAsync(x => x.UserName == userName && x.LessonTitle == title);

                if (userLesson != null)
                {
                    userLesson.IsComplited = true;
                    await databaseContext.SaveChangesAsync();
                }
            }
            await databaseContext.SaveChangesAsync();

            return Ok("Mispronunciation removed");
        }

        [HttpPost]
        [Route("addWordInVocabulary")]
        public async Task<IActionResult> AddWordInVocabulary([FromBody] VocabularyDTO request)
        {
            if(request == null) { return BadRequest("invalid data"); }

            var user = await databaseContext.Students.Where(x => x.Email == request.UserEmail).FirstOrDefaultAsync();
            var userName = user.FullName;

            var vocabulary = new VocabularyModel
            {
                UserName = userName,
                Word = request.Word,
            };

            await databaseContext.Vocabulary.AddAsync(vocabulary);
            await databaseContext.SaveChangesAsync();

            return Ok("Word Saved To Vocabulary");
        }


        [HttpGet]
        [Route("getAllLessons")]
        public async Task<IActionResult> GetAllParaLessons()
        {
            try
            {
                var lessons = await databaseContext.Lessons.ToListAsync();

                if (lessons == null || lessons.Count == 0)
                {
                    return NotFound("No lessons found");
                }

                return Ok(lessons);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("getLessonSummary")]
        public async Task<ActionResult<Dictionary<string, int>>> GetLessonsSummary(string email, int level)
        {
            var student = await databaseContext.Students.FirstOrDefaultAsync(x => x.Email == email);
            if (student == null)
            {
                return NotFound(); 
            }

            var userName = student.FullName;
            var totalLessonsCount = databaseContext.Lessons.Count(lesson => lesson.LessonLevel == level);
            var userLessonsCount = databaseContext.UserLessons.Count(lesson => lesson.LessonLevel == level && lesson.UserName == userName);

            int notStartedCount = totalLessonsCount - userLessonsCount;
            int completedCount = databaseContext.UserLessons.Count(lesson => lesson.LessonLevel == level && lesson.UserName == userName && lesson.IsComplited);
            int inProgressCount = databaseContext.UserLessons.Count(lesson => lesson.LessonLevel == level && lesson.UserName == userName && !lesson.IsComplited);

            var summary = new Dictionary<string, int>
            {
                { "completed", completedCount },
                { "inProgress", inProgressCount },
                { "notStarted", notStartedCount }
            };

            return Ok(summary);
        }


        [HttpGet]
        [Route("getUnstartedLessons")]
        public async Task<IActionResult> GetUnstartedLessons(string email)
        {
            var student = await databaseContext.Students.Where(x => x.Email == email).FirstOrDefaultAsync();

            if (student != null)
            {
                var userName = student.FullName;

                // Retrieve lessons that are not in UserLessons
                var lessonsNotInUserLessons = await databaseContext.Lessons
                    .Where(lesson => !databaseContext.UserLessons.Any(ul => ul.LessonTitle == lesson.LessonTitle && ul.UserName == userName))
                    .ToListAsync();

                return Ok(lessonsNotInUserLessons);
            }
            else
            {
                return BadRequest("Student not found"); // Or throw new Exception("Student not found");
            }
        }

        [HttpGet]
        [Route("getMyLessons")]
        public async Task<IActionResult> GetMyLessons(string email)
        {
            if(email == null)
            {
                return BadRequest("invalid data");
            }

            var student = await databaseContext.Students.Where(x => x.Email == email).FirstOrDefaultAsync();

            if (student != null)
            {
                var userName = student.FullName;
                var lessonsInUserLessons = await databaseContext.UserLessons.Where(x => x.UserName == userName).ToListAsync();

                return Ok(lessonsInUserLessons);
            }
            else
            {
                return BadRequest("Student not found"); 
            }
        }

        [HttpGet]
        [Route("getMispronunciations")]

        public async Task<IActionResult> GetMispronunciations(string email, string title)
        {
            var student = await databaseContext.Students.Where(x=>x.Email== email).FirstOrDefaultAsync();
            var username = student.FullName;
            if (student != null)
            {
                var userName = student.FullName;
                var mispronunciations = await databaseContext.Mispronunciations
                .Where(x => x.UserName == username && x.LessonTitle == title)
                .Select(x => new { x.M_What, x.M_How })
                .ToListAsync();

                return Ok(mispronunciations);
            }
            else
            {
                return BadRequest("invalid data");
            }
        }

        [HttpGet]
        [Route("getCompletedLessons")]
        public async Task<IActionResult> GetCompletedLessons(string email, int level)
        {
            if(email == null)
            {
                return BadRequest("invalid data");
            }
          
            var user = await databaseContext.Students.Where(x => x.Email == email).FirstOrDefaultAsync();
            var username = user.FullName;
            if(user == null)
            {
                return BadRequest("user not found");
            }
            else{
                var allLessons = await databaseContext.Lessons.Where(x => x.LessonLevel == level).ToListAsync();
                var completedLessons = await databaseContext.UserLessons.Where(x => x.UserName == username && x.LessonLevel == level && x.IsComplited == true).ToListAsync();
                var count = allLessons.Count() - completedLessons.Count();
                return Ok(count);
            }
        }

        [HttpGet]
        [Route("getVocabularyCollection")]
        public async Task<IActionResult> GetVocabularyCollection(string email)
        {
            if (email == null)
            {
                return BadRequest("invalid data");
            }

            var student = await databaseContext.Students.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (student != null)
            {
                var userName = student.FullName;

                var vocabularyCollection = await databaseContext.Vocabulary.Where(x => x.UserName == userName).ToListAsync();

                return Ok(vocabularyCollection);
            }
            else
            {
                return BadRequest("Student not found"); 
            }
        }

        [HttpGet]
        [Route("getOneLesson")]
        public async Task<IActionResult> GetOneLesson(string title)
        {
            if (title == null) { return BadRequest("Give title please"); }
            var lesson = await databaseContext.Lessons.Where(x => x.LessonTitle == title).FirstOrDefaultAsync();
            if (lesson == null)
            {
                return NotFound("Lesson not found with this title");
            }
            return Ok(lesson);
        }

        [HttpGet]
        [Route("getAllMispronunciations")] 
        public async Task<IActionResult> GetAllMispronunciations()
        {
            var allMispronunciations = await databaseContext.Mispronunciations.ToListAsync();
            if(allMispronunciations == null)
            {
                return NotFound("No mispronunciation exist");
            }
            else
            {
                var words = allMispronunciations.SelectMany(m => m.M_What).ToList();
                return Ok(words);
            }
        }
       
        [HttpPut]
        [Route("editLesson/")]
        public async Task<IActionResult> EditLesson(string title, [FromBody] LessonDTO updatedLessonDTO)
        {
            if (updatedLessonDTO == null)
            {
                return BadRequest("Invalid data");
            }

            try
            {
                var existingLesson = await databaseContext.Lessons
                .FirstOrDefaultAsync(x => x.LessonTitle == title);

                if (existingLesson == null)
                {
                    return NotFound($"Lesson with {title} not found");
                }

                existingLesson.LessonTitle = updatedLessonDTO.LessonTitle;
                existingLesson.LessonContent = updatedLessonDTO.LessonContent;
                existingLesson.LessonLevel = updatedLessonDTO.LessonLevel;
                existingLesson.FocusWords = updatedLessonDTO.FocusWords;

                await databaseContext.SaveChangesAsync();

                return Ok("Lesson updated successfully");
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("deleteLesson")]
        public async Task<IActionResult> DeleteLesson(string title)
        {
            if(title == null)
            {
                return BadRequest("empty string");
            }
            var lesson = await databaseContext.Lessons.Where(x => x.LessonTitle == title).FirstOrDefaultAsync();    
            if(lesson == null)
            {
                return NotFound("Lesson does not exist");
            }
            databaseContext.Lessons.Remove(lesson);
            await databaseContext.SaveChangesAsync();
            return Ok("Lesson Deleted Successfully");
        }

    }
}
