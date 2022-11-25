import { LocalStorageUtils } from 'src/app/utils/localStorage';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class FornececedorGuard implements CanActivate {
  localStorageUtils = new LocalStorageUtils

  constructor(private router: Router) { }

  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['/conta/login'])
    }

    let user = this.localStorageUtils.obterUsuario();
    let claim: any = routeAc.data[0];

    if (claim !== undefined) {
      let claim = routeAc.data[0]['claim']

      if (claim) {
        if (!user.claims) {
          this.navegarAcessoNegado();
        }

        let userClaims = user.claims.find(x => x.type === claim.nome);

        if (!userClaims) {
          this.navegarAcessoNegado();
        }

        let valoresClaim = userClaims.value as string;

        if (!valoresClaim.includes(claim.valor)) {
          this.navegarAcessoNegado();
        }

      }
    }

    return true;
  }

  navegarAcessoNegado() {
    this.router.navigate(['/acesso-negado'])
  }
}
