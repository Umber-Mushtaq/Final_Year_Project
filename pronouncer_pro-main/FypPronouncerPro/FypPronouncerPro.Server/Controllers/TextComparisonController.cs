using DiffPlex.DiffBuilder.Model;
using DiffPlex.DiffBuilder;
using DiffPlex;
using FypPronouncerPro.Server.DTO;
using Microsoft.AspNetCore.Mvc;
using DiffPlex.Model;

namespace FypPronouncerPro.Server.Controllers
{
    [ApiController]
    [Route("textcomparison")]
    public class TextComparisonController : Controller
    {
        [HttpPost]
        [Route("comparetext")]
        public IActionResult CompareTexts([FromBody] TextCompareRequest request)
        {
            var originalWords = request.OriginalString.Split(new[] { ' ', ',', '.', '?' }, StringSplitOptions.RemoveEmptyEntries)
                                                    .Select(word => word.ToLower())
                                                    .ToArray();

            var spokenWords = request.SpokenString.Split(new[] { ' ', ',', '.', '?' }, StringSplitOptions.RemoveEmptyEntries)
                                                .Select(word => word.ToLower())
                                                .ToArray();

            // Convert arrays to single strings
            var originalText = string.Join(" ", originalWords);
            var spokenText = string.Join(" ", spokenWords);

            var differ = new Differ();
            var diffResult = differ.CreateWordDiffs(originalText, spokenText, true, new[] { ' ' });

            var DifferentWords = new List<string>();

            var response = new TextCompareResponse
            {
                Mispronunciations = new List<string>(),
            };

            foreach (var block in diffResult.DiffBlocks)
            {
                for (int i = block.DeleteStartA; i < block.DeleteStartA + block.DeleteCountA; i++)
                {
                    DifferentWords.Add(diffResult.PiecesOld[i]);
                }
                for (int i = block.InsertStartB; i < block.InsertStartB + block.InsertCountB; i++)
                {
                    DifferentWords.Add(diffResult.PiecesNew[i]);
                }
            }

            for (int i = 0; i < DifferentWords.Count - 1; i++)
            {
                if (DifferentWords[i] != " " && diffResult.PiecesOld.Contains(DifferentWords[i]))
                {
                    response.Mispronunciations.Add(DifferentWords[i] + ", " + DifferentWords[i + 1]);
                    i++;
                }
            }
            return Ok(response);
        }
    }
}
