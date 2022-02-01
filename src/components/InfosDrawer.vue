<template>

  <section>

    <b-collapse
      class="card"
      animation="slide"
      aria-id="contentIdForA11y3"
      :open="false"
      >
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3">
          <p class="card-header-title">
            Encadrement légal du sociétariat dans une SCOP
          </p>
          <a class="card-header-icon">
            <b-icon
              :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          <p>
            Juridiquement, une Scop (Société coopérative et participative) est une société coopérative de forme SA, SARL ou SAS dont les salarié•e•s sont les associé•e•s majoritaires et le pouvoir y est exercé démocratiquement.
          </p>
          <p>
            Les bénéfices de la Scop sont obligatoirement répartis en trois parts :
          </p>
          <ul>
            <li>
              la part travail : participation des salariés aux bénéfices de l´entreprise ;
            </li>
            <li>
              la part entreprise : ce sont les réserves impartageables de l'entreprise ;
            </li>
            <li>
              la part capital, ou ce qui est redistribué en dividendes aux associé·e·s.
            </li>
          </ul>
          <p>
            Les textes législatifs sur les SCOP imposent une répartition des bénéfices respectant des minima et maxima, ainsi que des conditions particulières liées au sociétariat :
          </p>
          <p>
            Répartition des bénéfices en fin d´exercice:
          </p>
          <ul>
            <li>
            réserves pour la coopérative : minimum 16% des bénéfices ;
            </li>
            <li>
            participation des salarié•e•s : minimum 25% des bénéfices ;
            </li>
            <li>
            dividendes aux associé•e•s : doit être inférieur à la fois à la part dévolue aux réserves et à la part dévolue à la participation, au maximum 33% ;
            </li>
            <li>
            Attention toutefois, le montant de la prime de participation est plafonné et ne doit donc pas dépasser un certain plafond. En 2021, le montant maximum de la prime de participation est de 30 852€
            </li>
          </ul>
          <p>
            Le statut d'associé·e est lié au statut de salarié·e : si un·e associé·e-salarié·e démissionne il·elle perd son statut d'associé·e, et la coopérative doit lui rembourser ses parts sociales (sans plus-value par rapport à leur valeur initiale);
          </p>
          <p>
            Le sociétariat doit respecter les règles suivantes :
          </p>
          <ul>
            <li>
            les salarié•e•s-associé•e•s doivent représenter au minimum 65% des droits de vote ;
            </li>
            <li>
            les salarié•e•s-associé•e•s doivent détenir au minimum 51% du capital social ;
            </li>
            <li>
            aucun associé•e ne peut être majoritaire et détenir plus de 50% des parts sociales ;
            </li>
            <li>
            La valeur nominale d´une part sociale doit être comprise entre 16 € et 75 € ;
            </li>
            <li>
            La SAS SCOP peut avoir un capital variable ;
            </li>
          </ul>
          <p>
            Les mécanismes de participation et de dividendes ne se déclenchent que si les bénéfices en fin d´exercice sont positifs.
          </p>
        </div>
      </div>

      <!-- <footer class="card-footer">
        <a class="card-footer-item">Save</a>
        <a class="card-footer-item">Edit</a>
        <a class="card-footer-item">Delete</a>
      </footer> -->

    </b-collapse>

    </section>

</template>

<script>
export default {
  name: 'InfosDrawer'
}
</script>
