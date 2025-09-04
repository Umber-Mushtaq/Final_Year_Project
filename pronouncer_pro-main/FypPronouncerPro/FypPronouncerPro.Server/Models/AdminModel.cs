using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.Models
{
    public class AdminModel
    {
        [Key]
        public int AdminId { get; set; }
        [Required]
        public string AdminName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string AdminEmail { get; set; }

        [Required]
        public string AdminPassword { get; set; }

    }
}
