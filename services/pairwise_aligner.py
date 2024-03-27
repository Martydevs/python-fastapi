from Bio.Align import PairwiseAligner
from Bio.Seq import Seq

def pairwiseAlignerService(s1: str, s2: str):
  a = Seq(s1)
  b = Seq(s2)

  aligner = PairwiseAligner()
  alignments = aligner.align(a, b)
  
  return { "x" : alignments[0][0], "y" : alignments[0][1] }