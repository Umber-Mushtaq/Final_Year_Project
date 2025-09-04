using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.Models
{
    public class StudentsModel
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string FullName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool isActive { get; set; }
    }
}
