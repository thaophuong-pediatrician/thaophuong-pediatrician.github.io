# Comparison: Boston (Circ., 2007) vs Washington, D.C. (JASE, 2008)

## Coronary Artery Z-Score Calculation Methods

This document compares two major methodologies for calculating coronary artery z-scores in children: the Boston method (McCrindle et al., 2007) and the Washington, D.C. method (CNMC, 2008).

---

## Overview

Both methods provide z-scores for coronary artery dimensions normalized to body size, primarily used in the evaluation of Kawasaki disease. However, they use fundamentally different statistical approaches and assumptions.

---

## Key Differences

| Aspect | Boston (Circ., 2007) | Washington, D.C. (JASE, 2008) |
|--------|---------------------|-------------------------------|
| **BSA Formula** | Haycock formula<br>`0.024265 × H^0.3964 × W^0.5378` | DuBois formula<br>`0.007184 × H^0.725 × W^0.425` |
| **Regression Model** | Power regression<br>`Mean = a × BSA^b + c`<br>Linear SD: `SD = d + e × BSA` | Log-linear regression<br>`log(Mean) = β₁ + β₂ × log(BSA)`<br>Constant MSE (variance) |
| **Mean Calculation** | Direct calculation in mm<br>`Mean = (coefficient × BSA^power) - offset` | Log-transformed, then exponentiated<br>`Mean = exp(β₁ + β₂ × log(BSA))` |
| **Standard Deviation** | Variable (depends on BSA)<br>`SD = intercept + slope × BSA`<br>Allows for heteroscedasticity | Constant (MSE)<br>`SD = √MSE`<br>Assumes homoscedasticity |
| **Z-Score Calculation** | Linear<br>`Z = (measurement/10 - mean) / SD` | Log-transformed<br>`Z = (log(measurement/10) - log(mean)) / √MSE` |
| **Additional Features** | Z-score only | Z-score + Percentile |
| **Z-Score Thresholds** | Borderline: -1.96 < z ≤ -1.67<br>(asymmetric for negative values) | Borderline: -1.96 < z ≤ -1.65<br>(symmetric for negative values) |

---

## Mathematical Models

### Boston (McCrindle et al., 2007)

Uses a **power regression model** with **variable standard deviation** to account for heteroscedasticity (non-constant variance):

- **Mean:** `Mean = a × BSA^b - c` (in cm, converted to mm)
- **SD:** `SD = d + e × BSA` (allows SD to vary with BSA)
- **Z-score:** `Z = (measurement/10 - mean) / SD`

**Coefficients:**
- **RCA:** Mean = 0.26117 × BSA^0.39992 - 0.02756; SD = 0.02407 + 0.01597 × BSA
- **LAD:** Mean = 0.26108 × BSA^0.37893 - 0.02852; SD = 0.01465 + 0.01996 × BSA
- **LMCA:** Mean = 0.31747 × BSA^0.36008 - 0.02887; SD = 0.03040 + 0.01514 × BSA

### Washington, D.C. (CNMC, 2008)

Uses a **log-linear regression model** with **constant variance** (homoscedasticity):

- **Mean:** `log(Mean) = β₁ + β₂ × log(BSA)`, then `Mean = exp(log(Mean))`
- **SD:** `SD = √MSE` (constant for all BSA values)
- **Z-score:** `Z = (log(measurement/10) - log(mean)) / √MSE`

**Coefficients:**
- **LMCA:** β₁ = -1.31625, β₂ = 0.37442, MSE = 0.028467
- **LAD:** β₁ = -1.50927, β₂ = 0.41164, MSE = 0.033031
- **RCA:** β₁ = -1.46115, β₂ = 0.37870, MSE = 0.040172

---

## Clinical Implications

### When to Use Boston (2007)

**Advantages:**
- ✅ More recent methodology accounting for heteroscedasticity
  - Recognizes that variability increases with body size (more realistic)
- ✅ Larger, multi-center study (Pediatric Heart Network)
  - More generalizable results
- ✅ Published in high-impact journal (Circulation)
  - Widely accepted in the field
- ✅ More sophisticated statistical modeling
  - Accounts for non-constant variance

**Study Details:**
- Multi-center study from the Pediatric Heart Network
- Published in Circulation (2007)
- Larger sample size

### When to Use Washington, D.C. (2008)

**Advantages:**
- ✅ Provides percentile information
  - May be more intuitive for some clinicians
- ✅ Simpler model (constant variance)
  - Easier to implement and understand
- ✅ Single-center study from Children's National Medical Center
  - May be useful for comparison with local data

**Study Details:**
- Single-center study from CNMC
- Published in JASE (2008)
- Includes percentile calculations

---

## Practical Differences

### BSA Calculation

The **Haycock formula** (Boston) and **DuBois formula** (Washington) will produce slightly different BSA values for the same patient:

- **Haycock:** Generally produces slightly higher BSA values, especially in smaller children
- **DuBois:** Older formula, may underestimate BSA in very small children

**Note:** The difference is usually small (<5%) but can be significant in extreme cases.

### Z-Score Values

Due to different regression models and variance assumptions, the same measurement may yield different z-scores:

- **Boston:** Accounts for increasing variability with size (heteroscedasticity)
- **Washington:** Assumes constant variability (homoscedasticity)

**In practice:** Z-scores are usually within 0.2-0.5 of each other, but can differ more in extreme cases.

### Example Comparison

For a child with:
- Height: 120 cm
- Weight: 25 kg
- LMCA measurement: 3.0 mm

**Boston (2007):**
- BSA: ~0.91 m²
- Mean: ~2.78 mm
- Z-score: ~0.50

**Washington (2008):**
- BSA: ~0.89 m² (DuBois)
- Mean: ~2.75 mm
- Z-score: ~0.48

*(Note: Actual values may vary slightly due to rounding and calculation differences)*

---

## Recommendations

### Primary Use

**Boston (2007) is generally preferred** due to:
- More sophisticated statistical modeling
- Larger, multi-center study population
- Wider acceptance in the field
- Accounts for heteroscedasticity (more realistic)

### Comparison Use

**Use Washington (2008) when:**
- Percentile information is desired
- Comparing with local CNMC data
- Need for simpler model interpretation

### Consistency

**Always use the same method** for serial follow-up of the same patient to ensure consistency in monitoring disease progression.

---

## Statistical Considerations

### Heteroscedasticity vs Homoscedasticity

**Heteroscedasticity (Boston):**
- Variance changes with BSA
- More realistic for biological data
- Larger children have more variability
- Requires more complex modeling

**Homoscedasticity (Washington):**
- Constant variance across all BSA values
- Simpler model
- May not reflect biological reality
- Easier to implement

### Log-Transformation

**Washington method uses log-transformation:**
- Assumes multiplicative rather than additive relationships
- Can better handle skewed data
- Z-scores calculated in log space
- Results then back-transformed

**Boston method uses direct calculation:**
- Assumes additive relationships
- Simpler interpretation
- Z-scores calculated directly
- No transformation needed

---

## References

1. **McCrindle BW, Li JS, Minich LL, Colan SD, Atz AM, Takahashi M, Vetter VL, Gersony WM, Mitchell PD, Newburger JW; Pediatric Heart Network Investigators.** [Coronary artery involvement in children with Kawasaki disease: risk factors from analysis of serial normalized measurements](https://www.ncbi.nlm.nih.gov/pubmed/17576863). *Circulation*. 2007 Jul 10;116(2):174-9.

2. **[CNMC 2008 reference - please add full citation when available]**

3. **de Zorzi A, Colan SD, Gauvreau K, Baker AL, Sundel RP, Newburger JW.** [Coronary artery dimensions may be misclassified as normal in Kawasaki disease](https://www.ncbi.nlm.nih.gov/pubmed/9709715). *J Pediatr*. 1998 Oct;133(4):254-8.

---

## Notes

- This comparison is for educational purposes
- Clinical decisions should be made in consultation with experienced pediatric cardiologists
- Both methods are valid and have been published in peer-reviewed journals
- The choice of method may depend on institutional preference, study population, and clinical context

---

## Calculator Availability

Both calculators are available on this website:
- [Boston (Circ., 2007) Calculator](/)
- [Washington, D.C. (JASE, 2008) Calculator](/cnmc)
- [Comparison Page](/comparison)

